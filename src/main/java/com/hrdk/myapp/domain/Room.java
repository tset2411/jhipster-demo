package com.hrdk.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;

/**
 * A Room.
 */
@Entity
@Table(name = "room")
public class Room implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "room_number")
    private Long roomNumber;

    /**
     * A relationship
     */
    @Schema(description = "A relationship")
    @OneToMany(mappedBy = "room")
    @JsonIgnoreProperties(value = { "room" }, allowSetters = true)
    private Set<Resident> residents = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "rooms" }, allowSetters = true)
    private Facility facility;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Room id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRoomId() {
        return this.roomId;
    }

    public Room roomId(Long roomId) {
        this.setRoomId(roomId);
        return this;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public Long getRoomNumber() {
        return this.roomNumber;
    }

    public Room roomNumber(Long roomNumber) {
        this.setRoomNumber(roomNumber);
        return this;
    }

    public void setRoomNumber(Long roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Set<Resident> getResidents() {
        return this.residents;
    }

    public void setResidents(Set<Resident> residents) {
        if (this.residents != null) {
            this.residents.forEach(i -> i.setRoom(null));
        }
        if (residents != null) {
            residents.forEach(i -> i.setRoom(this));
        }
        this.residents = residents;
    }

    public Room residents(Set<Resident> residents) {
        this.setResidents(residents);
        return this;
    }

    public Room addResident(Resident resident) {
        this.residents.add(resident);
        resident.setRoom(this);
        return this;
    }

    public Room removeResident(Resident resident) {
        this.residents.remove(resident);
        resident.setRoom(null);
        return this;
    }

    public Facility getFacility() {
        return this.facility;
    }

    public void setFacility(Facility facility) {
        this.facility = facility;
    }

    public Room facility(Facility facility) {
        this.setFacility(facility);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Room)) {
            return false;
        }
        return id != null && id.equals(((Room) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Room{" +
            "id=" + getId() +
            ", roomId=" + getRoomId() +
            ", roomNumber=" + getRoomNumber() +
            "}";
    }
}
